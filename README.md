# pb-dashboard

The purpose of this repository is to provide access to the source code for a dashboard of police brutality cases in the US.

The dashboard provides a real-time view into police brutality across the United States. Furthermore, the dashboard is integrated with a form. The form allows people to report instances of police brutality. Those instances of police brutality then get reflected in the dashboard. We understand that self-reported data may not always be reliable. Therefore, we are requiring users to submit their reports with images or videos, for proof. If the community has recommendations on other ways to maintain data integrity, please let us know.

Our first iteration of the dashboard was scrappy. We used a mix of Google Forms, Google Sheets, and Tableau Public, to ship this first prototype here-> https://public.tableau.com/profile/kamran2555#!/vizhome/shared/937995TNC

This repo is a living version of the dashboard, as it evolves into an independent application of its own.

## Developing

This application is built on the React application framework [Next.js](https://nextjs.org/).

### Pre-requisites

In order to use run this project locally, you will need to have [node](https://nodejs.org/en/download/) and [docker](https://docs.docker.com/desktop/) installed.

### Installation

First install the project dependencies with:

```
npm i
```

### Running Locally

#### Run the Database

This repo comes with a development MySQL database that runs in docker based on the latest production dump (in mysql/dump.sql). You can generally start the database and just leave it running in the background.

```
npm run start-dev-db
```

If you need to refresh the database for any reason, stop and re-start it:

```
npm run stop-dev-db
npm run start-dev-db
```

#### Running the Development Server

To run, start the development server with the following command:

```
npm run dev
```

### Running in Production

To run in production, first build the production assets and then start the production server:

```
npm run build
npm run start
```
