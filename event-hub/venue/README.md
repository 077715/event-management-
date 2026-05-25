# Venue Provider Dashboard

This directory contains the HTML-based venue provider dashboard for the EventHub platform.

## Files

- `dashboard.html` - Main venue provider dashboard
- `login.html` - Standalone login page for venue providers
- `README.md` - This documentation file

## Features

### Dashboard Overview
- **Statistics Cards**: Total venues, bookings, earnings, and ratings
- **Recent Activity**: Latest booking requests and performance charts
- **Responsive Design**: Works on desktop and mobile devices

### Navigation Sidebar
- **Dashboard**: Overview and statistics
- **My Venues**: Manage existing venues
- **Add Venue**: Create new venue listings
- **Booking Requests**: Handle incoming booking requests
- **Logout**: Sign out functionality

### Venue Management
- **Venue Cards**: Display venue information with images
- **Status Management**: Available/Not Available status
- **Action Buttons**: View details, edit, and delete venues
- **Add New Venue**: Form to create new venue listings

### Booking Requests
- **Request Cards**: Show performer and event details
- **Action Buttons**: Accept or reject booking requests
- **Status Tracking**: Pending, confirmed, or rejected status

## Usage

### For Venue Providers

1. **Login**: Use email containing "venue" (e.g., `venue@example.com`) with any password
2. **Access Dashboard**: Automatically redirected to `/venue/dashboard.html`
3. **Manage Venues**: Add, edit, or delete venue listings
4. **Handle Bookings**: Accept or reject booking requests from performers

### Demo Credentials

- **Venue Provider**: `venue@example.com` / any password
- **Regular User**: `user@example.com` / any password

## Technical Details

### Technologies Used
- **Bootstrap 5**: UI framework and components
- **Bootstrap Icons**: Icon library
- **Chart.js**: Performance charts and graphs
- **Vanilla JavaScript**: Interactive functionality
- **CSS3**: Custom styling and animations

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile devices
- Responsive grid layouts
- Touch-friendly interface

## Integration with Main App

The venue provider dashboard integrates with the main React application:

1. **Authentication**: Uses the same user data structure
2. **Role-based Access**: Redirects based on user role
3. **Data Persistence**: Stores venue and booking data in localStorage
4. **Consistent Styling**: Matches the main app's design language

## Customization

### Styling
- Modify CSS variables in the `<style>` section
- Update color scheme by changing `--primary-color` and related variables
- Adjust spacing and layout as needed

### Functionality
- Add real API endpoints to replace localStorage
- Implement file upload for venue images
- Add email notifications for booking requests
- Integrate payment processing

### Data Structure
- Venue objects: `{id, name, capacity, pricePerDay, location, status, description, amenities, image}`
- Booking requests: `{id, performerName, eventName, date, venue, status, capacity, price}`

## Future Enhancements

- Real-time notifications
- Advanced filtering and search
- Calendar integration
- Payment processing
- Multi-language support
- Advanced analytics
- Mobile app integration
