package models

type Job struct {
	Id             int    `json:"id"`
	JobTitle       string `json:"jobTitle"`
	JobDescription string `json:"jobDescription"`
}

type JobLogPayLoad struct {
	JobId          int    `json:"jobID"`
	JobTitle       string `json:"jobTitle"`
	JobDescription string `json:"jobDescription"`
}
