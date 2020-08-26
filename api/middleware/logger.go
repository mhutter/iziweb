package middleware

import (
	"encoding/json"
	"net/http"
	"os"
	"time"
)

type responseWriter struct {
	http.ResponseWriter

	status         int
	didWriteHeader bool
}

func (rw *responseWriter) WriteHeader(code int) {
	if rw.didWriteHeader {
		return
	}

	rw.status = code
	rw.didWriteHeader = true
	rw.ResponseWriter.WriteHeader(code)
}

func wrapResponseWriter(w http.ResponseWriter) *responseWriter {
	return &responseWriter{
		ResponseWriter: w,
		status:         200,
		didWriteHeader: false,
	}
}

func AccessLog(next http.Handler) http.Handler {
	out := json.NewEncoder(os.Stdout)
	type logMessage struct {
		Method     string `json:"method"`
		Path       string `json:"path"`
		StatusCode int    `json:"status"`
		Time       string `json:"time"`
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.RequestURI == "/_health" {
			next.ServeHTTP(w, r)
			return
		}

		start := time.Now()
		wrapped := wrapResponseWriter(w)

		next.ServeHTTP(wrapped, r)

		msg := logMessage{
			Method:     r.Method,
			Path:       r.RequestURI,
			StatusCode: wrapped.status,
			Time:       time.Since(start).String(),
		}
		out.Encode(&msg)
	})
}
