# Login Stories

## User login process

* User lands on login screen
* User enters username/email address
  - Change 'username' text to 'email address'
* User enters password
* User clicks on LOGIN button

## Authentication and Authorization

* App may reject user credentials
  - Provide messaging about invalid credentials
  - User must be online to login
  - QUESTION: How do apps deal with disconnected login
* App accepts credentials

## Data Check & Sync

* App determines if user already is on device
* BIG: If user first login, sync all classroom data
* QUESTION: How do we handle new teacher and new data?
* If user has previous data, check for sync upload or download or both
* Provide messaging and progress for sync progress
  - App renders progress bar and percentage to show progress for upload
  - App renders progress bar and percentage to show progress for download
  - App will notify user if data sync fails

## User Type Selection

* User lands on User Type selection screen

### Student Path

* Student is sent to Student List page
* Student selects name and is sent to Password Image page
* If Student selects correct password image and is sent to Student Notepad screen
* If Student selects wrong password image, provide messaging to that effect
* If Student selects wrong password multiple times, provide system for teacher involvement

### Teacher Path

* User selects Teacher Path
* Teacher is sent to Group Management page