function all_schedules() { 

  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', () => {
    let schedules = request.response;
    if (schedules.length === 0) {
      alert('Sorry, there are no available schedules');
      return;
    }

    let result = {};
    schedules.forEach(schedule => {
      let id = String(schedule.staff_id)
      if (result['staff ' + id]) {
        result['staff ' + id] += 1
      } else {
        result['staff ' + id] = 1;
      }
    });
    alert(JSON.stringify(result));
  })

  request.addEventListener('timeout', event => {
    alert('This is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.')
  });

  request.send()
}
document.addEventListener('DOMContentLoaded', () => {
  let div = document.querySelector('div');
  div.addEventListener('submit', event => {
    event.preventDefault();
    let form = document.querySelector('form')
    let data = new FormData(form);
    if (data.get('name') && data.get('email')) {
      let request = new XMLHttpRequest();
      request.open('POST', '/api/staff_members');
      request.addEventListener('load', () => {
        if (request.status === 201) {
          let id = JSON.parse(request.response).id
          alert(`Successfully created staff with id: ${id}`)
          form.reset();
        } else {
          alert(request.responseText)
        }
      })
      request.send(data);
    } else {
      alert('Staff can not be created. Check your inputs');
    }
  })
})
