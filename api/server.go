package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/mhutter/izi/api/finance"
)

type Server struct {
	router *mux.Router
	db     *gorm.DB

	finance *finance.Service
}

func NewServer(db *gorm.DB) (*Server, error) {
	finance, err := finance.NewService(db)
	if err != nil {
		return nil, err
	}

	s := &Server{
		router:  mux.NewRouter(),
		db:      db,
		finance: finance,
	}

	s.routes()
	return s, nil
}

func (s Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}
