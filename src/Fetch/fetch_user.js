import { refreshToken } from "./fetch_authorization";

const getUserDetail = async (id) => {
  console.log("In progress (Get UserDetail)");
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getUserDetail(id);
    window.location.reload()
  } else if(res.status !== 200){
    Swal.fire(
      `${res.status}`,
      'Please Try again',
      'warning'
    ).then((res) => {
      window.location=document.referrer
    });
  }else {
    console.log("Failed to execute! " + res.status);
    return res.status;
  }
};

const editUserDetail = async (user, id) => {
  console.log("In progress (Edit UserDetail)");
  const res = await fetch(
    `${import.meta.env.VITE_BACK_URL}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(user),
    }
  );
  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    Swal.fire(
      'Edit Successfully',
      'You clicked the button!',
      'success'
    )
    return res.status;
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await editUserDetail(user, id);
    window.location.reload()
  } else if(res.status !== 200){
    
    const response = await res.json() 
    console.log(response.message);
    Swal.fire(
      `${response.message}`,
      'Please Try again',
      'warning'
    ).then((res) => {
      window.location=document.referrer
    });
  }else {
    console.log("Failed to execute! " + res.status);
    return res.status;
  }
};

const deleteUser = async (id) => {
  console.log("In progress (Delete User id#" + id + ")");
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then( async (result) => {
  if (result.isConfirmed) {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    if (res.status === 200) {
      console.log("Successfully executed! " + res.status);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then(res => {
        if(res.isConfirmed){
          window.location.reload();
        }
      })
      return res.status;
    }else if(res.status !== 200){
      const response = await res.json() 
      Swal.fire(
        `${response.message}`,
        'Please Try again',
        'warning'
      ).then((res) => {
        window.location=document.referrer
      });
    }
  }else{
      console.log("Failed to execute! This's user hasn't been deleted.");
  }
})
};

const getUsers = async () => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  console.log("In progress (Get Users)");
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getUsers();
    window.location.reload()
  } else {
    console.log("Failed to execute! " + res.status);
  }
};


export { deleteUser, getUserDetail, editUserDetail, getUsers};
