package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/jenagansivakumar/api/models"
)

func fetchWorker(id int, errorChan chan<- error, jobsChan chan<- models.Job, wg *sync.WaitGroup) {

	defer wg.Done()

	url := fmt.Sprintf("http://localhost:4000/jobs/fetch/%d", id)

	client := http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		errorChan <- fmt.Errorf("cannot get response from url: %v", err)
		return
	}
	defer resp.Body.Close()

	var jobs []models.Job
	if err := json.NewDecoder(resp.Body).Decode(&jobs); err != nil {
		errorChan <- fmt.Errorf("cannot decode response body: %v", err)
		return
	}

	for _, job := range jobs {
		jobsChan <- job
	}

}

func FetchAllResults(w http.ResponseWriter, r *http.Request) {

	var wg sync.WaitGroup
	errorChan := make(chan error, 20)
	jobsChan := make(chan models.Job, 20)
	count := 20

	for i := 0; i < count; i++ {
		wg.Add(1)
		go fetchWorker(i, errorChan, jobsChan, &wg)
	}

	go func() {
		wg.Wait()
		close(errorChan)
		close(jobsChan)
	}()

	var errorsList []error
	var jobsList []models.Job
	fullResponse := make(map[string]interface{})

	for {
		select {
		case err, ok := <-errorChan:
			if ok {
				errorsList = append(errorsList, err)
			} else {
				errorChan = nil
			}
		case job, ok := <-jobsChan:
			if ok {
				jobsList = append(jobsList, job)
			} else {
				jobsChan = nil
			}
		}

		if errorChan == nil && jobsChan == nil {
			break
		}
	}

	fullResponse["errors"] = errorsList
	fullResponse["jobs"] = jobsList

	jsonData, err := json.Marshal(fullResponse)
	if err != nil {
		http.Error(w, "Cannot marshall full response into JSON data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)

}
