export type Repo = {
    name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
    language: string;
}

export type Profile = {
    login: string;
    id: number;
    bio: string;
    avatar_url: string;
    followers: number;
    following: number;
}