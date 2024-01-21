# Github Repositories Listing Page

## Introduction

This task deals with listing  GitHub repositories of a specific github user using his github username and github RestAPI

## Features
 - Includes Search by username feature to list github repositories.
 - includes pagination of userrepositories ranging 5, 10, 50, 100.
## Constraints
- This task uses github REST API for unauthenticated users which allows only 60 requests per hour, beyond which it is rate limited.
- for more information refer [https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28](Rate limits for REST API).
