package api

import (
	"fmt"
	"net/http"
)

func (s Server) routes() {
	r := s.router

	r.HandleFunc("/_health", handleHealthz).Methods("GET")

	api := r.PathPrefix("/api").Subrouter()

	//
	// Finance
	//
	api.HandleFunc(
		"/finance/transactions",
		s.FinanceGetTransactions,
	).Methods("GET")

	api.HandleFunc(
		"/finance/transactions",
		s.FinanceCreateTransactions,
	).Methods("POST")

	api.HandleFunc(
		"/finance/transactions/{id:[0-9]+}",
		s.FinanceDeleteTransaction,
	).Methods("DELETE")
}

func handleHealthz(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "ok")
}
