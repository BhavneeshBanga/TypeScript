type GitHubUser = {
    login: string;
    id: number;
    name: string;
    public_repos: number;
};


const fetchGitHubUser = async (
    username: string
): Promise<GitHubUser> => {

    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    const data: GitHubUser = await response.json();

    // return data;
    return Promise.resolve(data)
};


// console.log(fetchGitHubUser("torvalds"))

fetchGitHubUser("torvalds")
    .then((user) => {

        console.log(user);

    });