import { refreshToken } from "./fetch_authorization";

const getEvents = async () => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getEvents();
    window.location.reload();
  } else {
    console.log("Failed to execute! " + res.status);
  }
};

const getPastEvents = async () => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/past`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getPastEvents();
    window.location.reload();
  } else {
    console.log("Failed to execute! " + res.status);
  }
};

const getUpcomingEvents = async () => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/future`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getUpcomingEvents();
    window.location.reload();
  } else {
    console.log("Failed to execute! " + res.status);
  }
};

const getEventsByDate = async (date) => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  const res = await fetch(
    `${import.meta.env.VITE_BACK_URL}/events/date/${date}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getEventsByDate();
    window.location.reload();
  } else {
    console.log("Failed to execute! " + res.status);
  }
};

const deleteEvent = async (event) => {
  Swal.fire({
    title: `Are you sure to remove event "${event.bookingName}"?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/events/${event.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      if (res.status === 200) {
        console.log("Successfully executed! " + res.status);
        Swal.fire("Deleted!", "This event has been deleted.", "success").then(
          (res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          }
        );
        return res.status;
      } else if(res.status !== 200){
        const response = await res.json() 
        Swal.fire(
          `${response.message}`,
          'Please Try again',
          'warning'
        ).then((res) => {
          window.location=document.referrer
        });
      }
    } else {
      console.log("Failed to execute! This's user hasn't been deleted.");
    }
  });
};

const addNewEvent = async (data) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: data,
  })
  console.log(res.status);
  if (res.status === 201) {
    console.log("Successfully executed! " + res.status);
    Swal.fire(
      "Successfully booking!",
      "Your booking has been successful !",
      "success"
    ).then((res) => {
      window.location.replace("../");
    });
    return res.status;
  } else if(res.status !== 200){
    const response = await res.json() 
    Swal.fire(
      `${response.message}`,
      'Please Try again',
      'warning'
    ).then((res) => {
      window.location=document.referrer
    });
  }else {
    console.log("Failed to execute! " + res.status);
    const response = await res.json();
    Swal.fire({
      icon: "warning",
      text: response.message,
    });
  }
};

const editEventDetail = async (id, data) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: data
  });

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    Swal.fire(
      "Successfully booking!",
      "Your booking has been successful !",
      "success"
    ).then((res) => {
      window.location=document.referrer
    });
    return res.status;
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await editEventDetail(id,data);
    window.location.reload();
  } else if(res.status !== 200){
    const response = await res.json() 
    Swal.fire(
      `${response.message}`,
      'Please Try again',
      'warning'
    ).then((res) => {
      window.location=document.referrer
    });
  }else {
    console.log("Failed to execute! " + res.status);
    const response = await res.json();
    Swal.fire({
      icon: "warning",
      text: response.message,
    });
  }
};

export {
  editEventDetail,
  getEvents,
  getPastEvents,
  getUpcomingEvents,
  getEventsByDate,
  addNewEvent,
  deleteEvent,
};
