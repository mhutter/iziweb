package finance

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
)

type Transaction struct {
	ID        uint       `json:"id,string" gorm:"primary_key"`
	Date      time.Time  `json:"date" gorm:"type:date"`
	Debit     uint16     `json:"debit" gorm:"type:int2"`
	Credit    uint16     `json:"credit" gorm:"type:int2"`
	Text      string     `json:"text"`
	Who       string     `json:"who"`
	Amount    int        `json:"amount"`
	Receipt   string     `json:"receipt"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"-"`
}

// GetTransactions returns all transactions on record
func (s Service) GetTransactions() ([]Transaction, error) {
	var txs []Transaction
	err := s.db.Find(&txs).Error
	return txs, err
}

// CreateTransactions inserts the given transactions into the DB
func (s Service) CreateTransactions(txs []*Transaction) error {
	return s.db.Transaction(func(db *gorm.DB) error {
		for _, tx := range txs {
			if err := db.Create(tx).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

// DeleteTransaction deletes the given transaction on the DB
func (s Service) DeleteTransaction(id int) error {
	if id < 1 {
		return fmt.Errorf("invalid transaction ID: %d", id)
	}

	return s.db.Where("id = ?", id).Delete(&Transaction{}).Error
}
