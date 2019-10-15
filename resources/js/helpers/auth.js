export function getLocalUser(flag) {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
        if (flag)
            return false;
        return null;
    }
    if (flag) 
        return true;
    return JSON.parse(userStr);
}