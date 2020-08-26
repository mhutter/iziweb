package finance

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// Service for finance domain functionality
type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) (*Service, error) {
	if err := db.AutoMigrate(&Transaction{}).Error; err != nil {
		return nil, fmt.Errorf("migrating models: %w", err)
	}

	return &Service{db: db}, nil
}
