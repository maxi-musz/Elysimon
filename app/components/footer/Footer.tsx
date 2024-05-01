import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from "react-icons/md";
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Shop Categories</h3>
                    <Link href="/">Phones</Link>
                    <Link href="/">Laptops</Link>
                    <Link href="/">Face Caps</Link>
                    <Link href="/">Watches</Link>
                    <Link href="/">Smart Watches</Link>
                    <Link href="/">Tvs</Link>
                    <Link href="/">Jewelries</Link>
                </FooterList>

                <FooterList>
                    {/* Customer service */}
                    <h3 className="text-base font-bold mb-2">Customer Services</h3>
                    <Link href="/">Contact Us</Link>
                    <Link href="/">Shipping Policy</Link>
                    <Link href="/">Returns and Exchanges</Link>
                    <Link href="/">FAQs</Link>
                    <Link href="/">Smart Watches</Link>
                    <Link href="/">Tvs</Link>
                    <Link href="/">Jewelries</Link>
                </FooterList>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-base font-bold mb-2">About Us</h3>
                    <p>Proving quality services and ensuring our customers get the best deals at the most perfect price. With a wide selection of phones, laptops, Tvs, Watches and many more</p>
                    <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
                </div>

                {/* Contact */}
                <FooterList>
                    <h3 className="text-base font-bold mb-2 ml-10">Follow Us</h3>
                    <div className="flex gap-2 ml-10">
                        <Link href="#">
                            <MdFacebook size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillTwitterCircle size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillInstagram size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillYoutube size={24}/>
                        </Link>
                    </div>
                </FooterList>
            </div>
        </Container>
    </footer>
    )
}
 
export default Footer;