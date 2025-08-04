# Real Estate Property Listing Web App

This is a real estate property listing platform built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It includes authentication, property browsing, filtering, pagination, and detail views. Data is fetched from a backend API, and session management is handled with `localStorage`.

## 1. Login System

The login screen accepts a fixed email and password combination (e.g., `admin@starberry.com / password123`).

- On successful login, email and auth flag are stored in `localStorage`.
- The app redirects to the property list page.
- On logout, localStorage is cleared and the user is returned to the login page.

## 2. Routing

The app uses React Router DOM. It restricts access to `/list` and `/detail/:id` routes if the user is not logged in.

```tsx
<Route path="/" element={<Login />} />
<Route path="/list" element={isLoggedIn ? <ListPage /> : <Navigate to="/" />} />
<Route path="/detail/:id" element={isLoggedIn ? <DetailPage /> : <Navigate to="/" />} />
```

## 3. Header Component

Displays the app title, the logged-in user’s email, and a logout button.

```tsx
<header>
  <h1>Properties</h1>
  <div>{userEmail} | Logout</div>
</header>
```

## 4. Property Listing

Displays cards for each property. Each card shows:
- Thumbnail (or fallback image)
- Title and address
- Bedrooms, listing type (sale/rent), and area
- Price and listing date

Clicking a card navigates to the property detail page.

## 5. Property Details

Displays:
- Large image
- Property title, description, rooms, and area
- Listing type, price
- Back button to return to the list

## 6. Filters

Users can filter properties by:
- Min/Max price
- Bedrooms
- Bathrooms
- City
- Listing type (sale/rent)

Filter values are passed as query parameters to the backend.

## 7. Debounced Filter Updates

Filters are debounced by 500ms using a custom `useDebounce` hook to reduce API load:

```ts
const debouncedFilters = useDebounce(filters, 500);
```

## 8. Pagination

Pagination is done on the server side. UI provides:
- Previous and next buttons
- Numbered buttons

Changing the page triggers a new API request immediately.

## 9. API Integration

Property data is fetched with pagination and filters:

```ts
getProperties({ page, pageSize, filters });
```

The API returns `data` and `meta` (pagination metadata).



## Getting Started

```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

Default login: `admin@starberry.com / password123`


