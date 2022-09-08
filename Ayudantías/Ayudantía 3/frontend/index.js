async function firstGet() {
    const response = await fetch('http://localhost:3000/movies', {
    method: 'GET',
    }).then((response) => {
    return response.json();
    }).then((responseJSON) => {  
        console.log(responseJSON);});
    }
    
    //get button
    const getButton = document.getElementsByTagName('button');
    getButton[0].addEventListener('click', firstGet);