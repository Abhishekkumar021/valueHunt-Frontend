import { useState, useEffect } from 'react';

import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/vh/vh.module.css';
import res_styles from '../styles/vh/resultPage.module.css';
import money from '../public/img/money.png'
let ScrollChange = 0;

export async function getStaticProps () {
  const token = process.env.token;
  const url = process.env.url;

  return {
    props: {
      token,
      url
    },
  };
}

export default function VhHandler (props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    // window is accessible here.
    if (ScrollChange) {
      window.scrollTo({ left: 0, top: 590, behavior: "smooth" });
    }
  }, [results]);

  async function submitHandler (event) {
    const x = document.getElementById("loader");
    x.classList.remove("close");
    x.classList.add("loading");

    event.preventDefault();
    setLoading(true);

    const clothImgInput = document.getElementById('clothImg');
    const data = new FormData();
    data.append('clothImg', clothImgInput.files[0]);
    data.append('brand', event.target.brand.value);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: data,
    };
    setError(null);
    setResults(null);
    try {

      const response = await fetch(props.url + '/vh', options);

      console.log('Resonponse is ', response)
      const result = await response.json();
      console.log('+++++++++++++++++++-Result--------------')
      console.log(result)
      ScrollChange = 1;
      setResults(result);
      setLoading(false);
      x.classList.remove("loading");
      x.classList.add("close");


    } catch (error) {
      setLoading(false);
      x.classList.remove("loading");
      x.classList.add("close");
      console.log(error)
      setError('Something went wrong. Please try again later');
    }
    setFormKey(formKey + 1);

  }

  return (
    <>
      <Head>
        <title>App | ValueHunt</title>
      </Head>


      <div className={styles.html_form}>
        <div className={styles.heading}>
          <h1>Upload Cloth Image</h1></div>
        <form action="#" method="post" onSubmit={submitHandler} className={styles.innerform} key={formKey}>
          <div className={styles.per_info}>
            <div className={styles.cloth}>
              <label htmlFor="Upload photo" className={styles.file}>Choose Picture
                <input type="file" id="clothImg" name="clothImg" className={styles.clothId} required accept='image/*' />
              </label>
            </div>

            <div className={styles.brand}>
              <label htmlFor="brand" className={styles.brand}>Choose Brand</label>
              <select name="brand" className={styles.brandId}>
                <option className={styles.brand} name='brand'>No Brand</option>
                <option className={styles.brand} name='brand'>Allen Solly</option>
                <option className={styles.brand} name='brand'>Adidas</option>
                <option className={styles.brand} name='brand'>Jockey</option>
                <option className={styles.brand} name='brand'>Raymond</option>
              </select>
            </div>

            <input type="submit" value="Submit" className={styles.my_btn} />
          </div>
        </form>
      </div >

      <div className={res_styles.mainContainer} id={'res'}>
        {results && (
          <div className={res_styles.allResults} >
            {typeof results === 'object' ? (
              <>
                <h2>Results</h2>
                <div className={res_styles.resultContainer}>
                  {Object.entries(results).map(([site, products]) => (
                    <div key={site} >
                      <h3 className={res_styles.siteName}>{site.charAt(0).toUpperCase() + site.slice(1)}</h3>
                      {Array.isArray(products) ? (products.length === 0 ? (
                        <div className={res_styles.noProduct}>No products found</div>
                      ) : (
                        <div className={res_styles.productContainer}>
                          {products.map((product, index) => (
                            <div key={index} className={res_styles.prodContainer}>
                              <a
                                href={product.ProdLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={product.ImageSrc}
                                  width={200}
                                  height={200}
                                />
                                <div className={res_styles.buy_link}>
                                  <a
                                    href={product.ProdLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {product.Label.substring(0, 20)}
                                  </a>
                                </div>
                                <div className={res_styles.price}>

                                  <Image
                                    src={money}
                                    width={30}
                                    height={30}
                                  />

                                  <h3>{product.Price}</h3></div>

                              </a>

                            </div>
                          ))}
                        </div>
                      )) : (
                        <div className={res_styles.noProduct}>{products}</div>
                      )}
                    </div>
                  ))}
                </div>
              </>) : (<div className={res_styles.noProduct}>{results}</div>
            )}

          </div>

        )}
        {error && (
          <div className={res_styles.error_message}>{error}</div>
        )}

      </div>
    </>
  );
}