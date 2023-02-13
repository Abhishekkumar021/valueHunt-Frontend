import styles from "../styles/vh/vh.module.css";
import Head from "next/head";

export async function getStaticProps() {
  const token = process.env.token;

  return {
    props: {
      token,
    },
  };
}

export default function Contact(props) {
  function createHtml(msg, color) {
    const notify_area = document.getElementById("notification");
    // console.log(notify_area)
    // console.log('msg,color' ,msg,color)
    notify_area.classList.remove("close");
    notify_area.classList.add("notification");
    notify_area.classList.add(color);
    notify_area.innerHTML = `<h2>${msg}</h2>`;
    notify_area.classList.add("anim");
    setTimeout(() => {
      notify_area.classList.add("close");
      notify_area.classList.remove("success");
      notify_area.classList.remove("danger");
    }, 10000);
  }

  async function submitHandler(event) {
    let x = document.getElementById("loader");
    x.classList.remove("close");
    x.classList.add("loading");
    event.preventDefault();
    // console.log("Submitted", event);
    // console.log(process.env.token)
    const clothImgInput = document.getElementById('clothImg');
    var data = new FormData()
    data.append('clothImg', clothImgInput.files[0])
    data.append('size', event.target.size.value)
    data.append('brand',event.target.brand.value)
    data.append('clothType', event.target.clothType.value)
   
    console.log(data)
    // const JSONdata = JSON.stringify(data);
    // console.log(JSONdata)
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      // Body of the request is the JSON data we created above.
      body: data,
    };

    const response = await fetch("http://127.0.0.1:5000/vh", options);
    const result = await response.json();
    event.target.clothImg.value = "";
    event.target.size.value = "";
    event.target.brand.value = "";
    event.target.clothType.value = "";
    x.classList.add("close");
    x.classList.remove("loading");

    // if (!response.ok) {

    //     createHtml(result, 'danger')
    // }
    // else {

    //     createHtml(result, 'success')

    // }
  }

  return (
    <>
      <Head>
        <title>App | ValueHunt</title>
      </Head>

      <div className={styles.contact}>
        <div className={styles.html_form}>
          <form
            action="#"
            method="post"
            onSubmit={submitHandler}
            className={styles.innerform}
          >
            <div className={styles.per_info}>
              
                <div className={styles.name}>
                  {" "}
                  <label htmlFor="clothImg">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="clothImg"
                    id="clothImg"
                    required
                    min="3"
                    accept="image/*"
                  />
                </div>
                <div className={styles.size}>
                  <label htmlFor="size">Size</label>
                  <input type="number" name="size" id="size" max={50} min={20} />
                </div>
                <div className={styles.brand}>
                  <select name="brand" id="brand">
                    <option name="brand">No Brand</option>
                    <option name="brand">Adidas</option>
                    <option name="brand">ck</option>
                    <option name="brand">lenovo</option>
                    <option name="brand">hp</option>
                  </select>
                </div>
                <div className={styles.clothtype}>
                  <select name="clothType" id="clothType">
                   
                    <option name="clothType" >Cotton</option>
                    <option name="clothType">No Cotton</option>
                    <option name="clothType">Mixed</option>
                  </select>
                </div>
                <input type="submit" value="Submit" className={styles.my_btn} />
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
}