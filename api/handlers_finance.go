package api

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mhutter/izi/api/finance"
)

// FinanceGetTransactions GET /api/finance/transactions
func (s Server) FinanceGetTransactions(w http.ResponseWriter, r *http.Request) {
	txs, err := s.finance.GetTransactions()
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		log.Panicf("FinanceGetTransactions: %s", err)
	}

	w.Header().Set("content-type", "application/json; encoding=utf-8")
	if err := json.NewEncoder(w).Encode(&txs); err != nil {
		log.Printf("Error sending JSON data: %s", err)
	}
}

// FinanceCreateTransactions POST /api/finance/transactions
func (s Server) FinanceCreateTransactions(w http.ResponseWriter, r *http.Request) {
	var txs []*finance.Transaction
	if err := json.NewDecoder(r.Body).Decode(&txs); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := s.finance.CreateTransactions(txs); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := json.NewEncoder(w).Encode(&txs); err != nil {
		log.Printf("Error sending JSON data: %s", err)
	}
}

// FinanceDeleteTransaction DELETE /api/finance/transaction/:id
func (s Server) FinanceDeleteTransaction(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Panicln("converting ID:", err)
	}

	if err := s.finance.DeleteTransaction(id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
