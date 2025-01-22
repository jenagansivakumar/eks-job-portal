package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDb() error {
	var err error

	connString := "host=localhost port=5432 user=postgres password=password dbname=usersdb sslmode=disable"

	DB, err = sql.Open("postgres", connString)
	if err != nil {
		log.Println("Cannot init DB")
		return err
	}

	if err := DB.Ping(); err != nil {
		log.Println("Cannot connect to DB")
		return err
	}

	fmt.Println("Connected to DB")

	return nil
}
