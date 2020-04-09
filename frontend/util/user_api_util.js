export const fetchUser = userId => (
    $.ajax({
        url: `/api/users/${userId}`,
        method: "GET"
    })
);

export const createUser = user => (
    $.ajax({
        url: `/api/users`,
        method: "POST",
        data: { user }
    })
);

export const updateUser = user => (
    $.ajax({
        url: `/api/users/${user.id}`,
        method: "PATCH",
        data: { user }
    })
);

export const login = user => (
    $.ajax({
        url: `/api/session`,
        method: "POST",
        data: { user }
    })
);

export const logout = () => (
    $.ajax({
        url: `/api/session`,
        method: "DELETE"
    })
);