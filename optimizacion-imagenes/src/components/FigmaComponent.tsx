import image2 from "/image-2.jpg";
import image3 from "/image-3.jfif";

const ratingStars = [1, 2, 3, 4, 5];

const FigmaComponent = () => {
    return (
        <article className="relative h-[147px] w-[908px] overflow-hidden border border-solid border-white bg-[linear-gradient(183deg,rgba(72,86,116,1)_0%,rgba(31,31,32,1)_100%)]">
            <img
                className="absolute left-[3.52%] top-3.5 h-[119px] w-[96.48%] object-cover"
                alt=""
                src={image2}
            />
            <img
                className="absolute left-8 top-[15px] h-[102px] w-[102px] object-cover"
                alt="Album artwork for Mr. Crowley by Ozzy Osbourne"
                src={image3}
            />
            <div className="absolute left-[18.72%] top-[37.41%] flex h-[24.49%] w-[55.95%] items-center">
                <h1 className="[font-family:'Inter-Bold',Helvetica] text-[26px] font-bold leading-[normal] tracking-[0] text-white">
                    MR. CROWLEY - OZZY OSBOURNE
                </h1>
            </div>
            <div
                className="absolute right-8 top-[50%] flex -translate-y-1/2 items-center gap-[11px] text-black"
                aria-label="Rating: 5 out of 5 stars"
            >
                {ratingStars.map((star) => (
                    <svg
                        key={star}
                        className="h-[43px] w-[43px] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M12 2.25l2.938 5.953 6.57.955-4.754 4.633 1.122 6.543L12 17.246l-5.876 3.088 1.122-6.543L2.492 9.158l6.57-.955L12 2.25z" />
                    </svg>
                ))}
            </div>
        </article>
    );
};

export default FigmaComponent;