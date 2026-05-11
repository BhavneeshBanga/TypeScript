const add = (a: number, b: number): number => {
    return a + b;
};

console.log(add(5, 4));

// interface User {
//     name : "Bhavi";
// }


// const fetchUser = async (
//     id: string
// ): Promise<string> => {

//     return "User " + id;
// };

// console.log(fetchUser("29"))


// console.log("A");

// fetchUser('29').then((data) => {
//     console.log(data);
// });

// console.log("B");

type User = {
    id: number;
    name: string;
};

type Post = {
    id: number;
    title: string;
};

const fetchUser = async (
    id: number
): Promise<User> => {

    const response = await fetch(`/api/user/${id}`);

    const data: User = await response.json();

    return data;
};

const fetchPosts = async (
    userId: number
): Promise<Post[]> => {

    const response = await fetch(`/api/posts/${userId}`);

    const data: Post[] = await response.json();

    return data;
};

fetchUser(1)
    .then((user) => {
        return fetchPosts(user.id);
    })
    .then((posts) => {
        console.log(posts);
    })
    .catch((err) => {
        console.log(err);
    });