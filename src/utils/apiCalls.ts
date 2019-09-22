const signIn = () => {
    fetch("http://localhost:3000/signIn", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(response => {
        console.log(response);
      })
}

export {
    signIn
};