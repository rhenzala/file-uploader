# file-uploader
A simple file uploader built with Express.js, PrismaORM, and Supabase.
Login or create an account, the website only requires username and password. In the dashboard, click the New button to create new folder or upload a file. Click on either Files or Folders to view the Files or Folders list. In the Files section, clicking on the file name will open the file in new tab. Clicking on three dots under the Details column, will redirect to new page show the file details. The action column contains the delete button. In the Folders section, clicking the folder name will redirect to that folder page, which in turn the user can create file in that folder or another subfolder. 

## Usage and Installation
1. Clone this repo:
```
git clone git@github.com:rhenzala/file-uploader.git
cd file-uploader
```
2. Install dependencies:
```
npm init -y
npm install
```
3. Run
```
node --watch app.js
```
or if using start script:
```
npm start
```
4. Make sure to update the .env for preferred storage and database server.

## Attribution
The icons used in this website is taken from <a href="https://feathericons.com/">Feather Icons</a>.

