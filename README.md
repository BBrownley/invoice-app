# Invoicing app

This is a full stack web application that tracks user invoices. Users login, create and view their invoices, while also being able to edit and delete them. There is also accessibility for guests to use the app if they do not want to make an account; localStorage is instead utilized for this use case.

## Tech used

MERN stack (MongoDB, Express, React, Node.js), styled-components

## Why? What did I learn?

I enjoy working with the full web stack so I thought this would be a fun project to do on the side while I continued to work on my Reddit clone. I also really liked the design from the Figma file I chose to replicate and wanted to challenge myself with this more complex layout. 

In the end I solidified my understanding of building full stack applications and improved my skills in building unique layouts. I also got an opportunity to see what custom hooks were all about by implementing a useScreenWidth hook to adjust HTML contents on the page as it changes width. There was also a bug I came across while refreshing on a single invoice that required me to use localStorage so that users can refresh and continue viewing their invoice without the application crashing.

## Features

* User authentication
* Guest accessibility
* CRUD (Create/Read/Update/Delete) operations on invoices
* Create lists of items for a specific invoice
* Dark mode
* Fully responsive
