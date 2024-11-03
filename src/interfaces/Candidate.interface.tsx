// TODO: Create an interface for the Candidate objects returned by the API
// Create an interface of the candidate with name, username, location, avatar, email, html_url, and company
export interface Candidate {
    login: string;         // GitHub username
    id: number;            // Unique identifier for the user
    avatar_url: string;    // URL of the user's avatar
    html_url: string;      // URL to the user's GitHub profile
    name?: string;         // Name of the user (optional)
    location?: string;     // Location of the user (optional)
    email?: string;        // Email of the user (optional)
    company?: string;      // Company the user works at (optional)
    bio?: string;          // bio of the user (optional)
}

