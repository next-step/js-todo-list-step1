console.log('script loaded');


const onNewItemSubmit = e => {
    if(e.key === 'Enter') {
        console.log('enter key pressed')
    }

    console.log(e);
}

document.getElementById('new-todo-title').addEventListener('keydown', onNewItemSubmit);
