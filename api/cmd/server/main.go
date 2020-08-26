package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jinzhu/gorm"
	// GORM dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"github.com/mhutter/izi/api"
	"github.com/mhutter/izi/api/middleware"
)

func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
}

func main() {
	if err := run(); err != nil {
		log.Println(err)
	}
}

func run() error {
	db, err := dialDB()
	if err != nil {
		return fmt.Errorf("connecting db: %w", err)
	}
	defer db.Close()
	if os.Getenv("DEBUG") != "" {
		db = db.Debug()
	}

	srv, err := api.NewServer(db)
	if err != nil {
		return fmt.Errorf("creating server: %w", err)
	}

	s := &http.Server{
		Handler:        middleware.AccessLog(srv),
		Addr:           addr(),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1 MB
	}

	log.Printf("Starting server at http://127.0.0.1%s/", s.Addr)
	return s.ListenAndServe()
}

func addr() string {
	if port := os.Getenv("PORT"); port != "" {
		return ":" + port
	}
	return ":3000"
}

func dialDB() (*gorm.DB, error) {
	url := os.Getenv("DB_URL")
	if url == "" {
		return nil, errors.New("DB_URL not set")
	}

	return gorm.Open("postgres", url)
}
