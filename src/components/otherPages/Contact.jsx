import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import ContactMap from "./ContactMap";
export default function Contact() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();

          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="flat-section flat-contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="contact-content">
                <h4>Drop Us A Line</h4>
                <p className="body-2 text-variant-1">
                  Feel free to connect with us through our online channels for
                  updates, news, and more.
                </p>
                <form
                  onSubmit={sendMail}
                  ref={formRef}
                  className="form-contact"
                >
                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="name">Full Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        name="name"
                        id="name"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="email">Email Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        id="email"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="phone">Phone Numbers:</label>
                      <input
                        type="text"
                        className="form-control style-1"
                        placeholder="ex 012345678"
                        name="phone"
                        id="phone"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="subject">Subject:</label>
                      <input
                        type="text"
                        className="form-control style-1"
                        placeholder="Enter Keyword"
                        name="subject"
                        id="subject"
                      />
                    </fieldset>
                  </div>
                  <fieldset>
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                      name="message"
                      className="form-control"
                      cols={30}
                      rows={10}
                      placeholder="Message"
                      id="message"
                      required
                      defaultValue={""}
                    />
                  </fieldset>
                  <div
                    className={`tfSubscribeMsg  footer-sub-element ${
                      showMessage ? "active" : ""
                    }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        Message has been sent successfully
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Something went wrong</p>
                    )}
                  </div>
                  <div className="send-wrap">
                    <button className="tf-btn primary size-1" type="submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="contact-info">
                <div className="content-left img-animation wow">
                  <img
                    className="lazyload"
                    alt=""
                    src="/images/banner/image-07.jpg"
                    width={945}
                    height={657}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div
          id="map-contact"
          className="map-contact"
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <ContactMap />
        </div>
      </section>
    </>
  );
}
