var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
    fetch('quotes', {
        method: 'put',  // PUT request
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({  // Converter til JSON format
          'name': 'Annoying Quote Dude',
          'quote': 'I find your lack of faith disturbing.'
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
      })
    })

    del.addEventListener('click', function () {
        fetch('quotes', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': 'Annoying Quote Dude'
          })
        }).then(function (response) {
          window.location.reload()
        })
      })