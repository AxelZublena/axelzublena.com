export async function load({ fetch }) {
    const res = await fetch("/blog", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const jsonRes = await res.json();
    return {
        values: jsonRes
    };
}
