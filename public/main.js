var update = document.getElementById('update')

update.addEventListener('click', function () {

    fetch('quotes', {
        method: 'put',  // PUT request
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({  // Converter til JSON format
          'name': 'Darth Vader',
          'quote': 'I find your lack of faith disturbing.'
        })
      })
    
  })