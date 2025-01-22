package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/jenagansivakumar/api/db"
	joblog "github.com/jenagansivakumar/api/jobLog"
	"github.com/jenagansivakumar/api/middleware"
)

func main() {

	if err := db.InitDb(); err != nil {
		log.Fatalf("Failed to connect to db: %v", err)
	}

	router := muxRouter()

	handler := middleware.CorsMiddleWare(router)

	server := http.Server{
		Handler:      handler,
		Addr:         ":8080",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Printf("Server is running on port %s\n", server.Addr)
	log.Fatal(server.ListenAndServe())
}

func muxRouter() *mux.Router {
	// redisClient := clients.RedisClient()
	// client := http.Client{
	// 	Timeout: 10 * time.Second,
	// }
	r := mux.NewRouter()
	r.HandleFunc("/logs", joblog.JobLog)
	r.HandleFunc("/", FetchAllResults)

	return r
}
