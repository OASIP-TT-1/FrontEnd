import { refreshToken } from "./fetch_authorization";

const getCategories = async () => {
  const isLogin = () => {
    if (localStorage.getItem("accessToken") != null) {
      return {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
    } else {
      return {};
    }
  };

  console.log("In progress (Get Categories)s");
  const res = await fetch(
    `${import.meta.env.VITE_BACK_URL}/categories`,
    isLogin()
  );
  if (res.status === 200) {
    const response = await res.json();
    console.log("Successfully executed! " + res.status);
    return response;
  } else {
    console.log("Failed to execute! " + res.status);
    return res.status;
  }
};

const editCategory = async (id, editCategory) => {
  console.log("เข้า edit");
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(editCategory),
  });

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
    await editCategory(editCategory);
    window.location.reload();
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

export { getCategories, editCategory };