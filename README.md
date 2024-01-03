Introduction

Welcome to the Flash Card App! This application is a powerful and intuitive tool designed to enhance your learning experience through the creation, management, and sharing of flash cards. Whether you're a student aiming to optimize study sessions or an individual interested in effective information retention, this app provides a versatile and user-friendly solution.

Features

1. Flash Card Management

Creating Cards

Easily create new flash cards with a user-friendly interface supporting both text and image content. The creation process is intuitive, allowing you to input diverse information onto your cards, catering to different learning styles.

Updating Cards

Effortlessly update existing flash cards by modifying the front text, back answer, and status. The app ensures a seamless editing experience, providing a straightforward process to keep your cards up-to-date.

Deleting Cards

Remove unwanted cards from your collection with a simple delete action. The app reflects these changes in real-time, ensuring your flash card library remains tailored to your learning needs.

2. Display and Interaction

Card Display

The Flash Cards page presents a visually appealing list of cards, sorted by the most recent modification date. Each card is interactive, allowing users to flip and view both front and back sides, providing a dynamic and engaging learning experience.

Searching Cards

Utilize the search bar to find specific cards based on text present on either side. The search functionality is case-insensitive, ensuring a flexible and efficient search experience, essential for quick retrieval of information.

Filtering Cards

Filter cards based on their status, choosing from options such as "Want to Learn," "Mark as Noted," and more. This feature simplifies organization and categorization, allowing you to focus on specific sets of cards.

Sorting Cards

Sort cards based on various attributes, including the order of addition, alphabetical order of front text, or reverse alphabetical order of front text. Tailor the arrangement of your flash cards to your specific preferences and learning strategies.

3. Storage Integration

The app seamlessly integrates with a json-server to ensure data persistence. All flash cards are fetched from and persisted back to the server, maintaining synchronization between the application and server states. This feature guarantees that your flash card data is securely stored and accessible across sessions.

4. Bonus Features

Share Function

Select multiple cards and share their details over email in JSON format. This collaborative feature enhances the sharing of flash card content, making it easy to collaborate with peers or share curated sets of flash cards.

Getting Started

Follow these detailed steps to get the Flash Card App up and running:

1. Clone the Repository: Clone this repository to your local machine.
   ```bash
   git clone https://github.com/gunaigojaeva/weba3
   ```

2. Navigate to the Project Directory: Change into the project directory.
   ```bash
   cd flash-card-app
   ```

3. Install Dependencies: Install the necessary dependencies.
   ```bash
   npm install
   ```

4. Start the Application: Launch the application.
   ```bash
   npm start
   ```

5. Access the App: Open your browser and visit [http://localhost:3001](http://localhost:3000) to access the app.

Technologies Used

- React: A JavaScript library for building user interfaces.
- json-server: A simple and lightweight JSON server for mocking APIs.

Project Structure

- src/components: Home to various React components.
- src/services/api.js: API service for seamless interaction with the json-server.
- db.json: Defines the structure of flash cards.
- server.js: Configures and launches the json-server.


Pages

1. Home (Home.jsx)

- Purpose: The home page introduces the user to the app and displays information about the developer's projects.
  
- Components Used:
  - `Navbar`: Navigation bar component.
  - `Projects`: Displays the developer's projects.

- Hooks Used:
  - `useState`: Manages the state for storing the developer's projects.
  - `useEffect`: Fetches data about the developer's projects when the component mounts.

2. Flash Cards (FlashCards.jsx)

- Purpose: Manages flash cards, including creation, deletion, and updating. Provides features like searching, filtering, sorting, and sharing.

- Components Used:
  - `Navbar`: Navigation bar component.
  - `CreateModal`: Modal for creating new flash cards.
  - `UpdateCardModal`: Modal for updating existing flash cards.
  - `EachCard`: Represents an individual flash card.
  - `InfiniteScroll`: Enables infinite scrolling for loading more cards.

- Hooks Used:
  - `useState`: Manages various state variables, including cards, selected cards, modals, search input, and more.
  - `useEffect`: Fetches flash card data based on status and sorting options. Also handles infinite scrolling.
  - Custom Hooks:
    - `flipAction`: Toggles the `isFlipped` property of a specific card.
    - `statusChangeAction`: Handles changes in the status dropdown.
    - `sortingChangeAction`: Handles changes in the sorting dropdown.
    - `createAction`: Handles the creation of new flash cards.
    - `updateAction`: Sets the update state and opens the update modal.
    - `updateCardAction`: Handles the update of an existing card.
    - `deleteAction`: Handles the deletion of a card.
    - `handleSearchInputChange`: Updates the search input state.
    - `selectedCardAction`: Updates the list of selected cards.
    - `shareAction`: Generates a JSON string for selected cards and opens the user's default email client to share the content.

3. Contact (ContactPage.jsx)

- Purpose: Provides a simple contact form for users to submit messages.

- Components Used:
  - `Navbar`: Navigation bar component.
  - `ContactForm`: Component rendering the contact form.

Functions and Methods

 1. Flash Cards (FlashCards.jsx)

- loadMore: Fetches additional cards for infinite scrolling.
- handleSelectCard: Handles the selection of a card.
- shareMethod: Shares selected card details via email.
- statusChangeMethod: Handles changes in the status dropdown.
- sortingChangeMethod: Handles changes in the sorting dropdown.
- rearrangeMethod: Rearranges the position of cards.
- deleteMethod: Deletes a card from the server.
- updateMethod: Initiates the update process for a card.
- createMethod: Creates a new card.
- cardUpdatingMethod: Updates an existing card.
- openCreateModal: Opens the modal for creating new cards.
- closeCreateModal: Closes the modal for creating new cards.
- closeUpdateModal: Closes the modal for updating cards.
- searchPartChangerMethod: Updates the search input state.

2. Contact Form (ContactForm.jsx)

- submitAction: Submits the contact form data to the server.

 Hooks

- useState: Used throughout the application for managing various state variables.
- useEffect: Used for fetching data when components mount and handling infinite scrolling.
- Custom Hooks (in FlashCards.jsx):
  - `flipAction`: Manages the state for toggling card flipping.
  - `statusChangeAction`: Manages the state for status dropdown changes.
  - `sortingChangeAction`: Manages the state for sorting dropdown changes.
  - `createAction`: Manages the state for creating new cards.
  - `updateAction`: Manages the state for updating cards.
  - `updateCardAction`: Manages the state for updating an existing card.
  - `deleteAction`: Manages the state for deleting a card.
  - `handleSearchInputChange`: Manages the state for search input changes.
  - `selectedCardAction`: Manages the state for selected cards.
  - `shareAction`: Manages the state for sharing selected cards.
