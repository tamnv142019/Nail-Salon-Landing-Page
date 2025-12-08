import { useEffect, useRef, useState, memo } from 'react';
import { Star, ExternalLink, Award, Heart } from 'lucide-react';

// Real Google Reviews data from Queen's Nails Hair and Skincare
const reviews = [
  {
    author: 'Allison Wiener',
    rating: 5,
    date: '3 months ago',
    text: 'Helen did a fantastic job! I came in for pink & white ombré, and she added a sparkle! Shape was beautiful and lasted a long time. My friend recommended her and she always has the BEST designs copied from pictures - very impressive. Thank you!!',
    avatar: 'https://images.unsplash.com/photo-1686036248156-801ee8e03c28?w=100&h=100&fit=crop',
    verified: true,
    helpful: 12,
  },
  {
    author: 'Scarlet Checkers',
    rating: 5,
    date: '4 months ago',
    text: 'I\'ve been coming here for years. Helen does beautiful work! I don\'t trust anyone else in town to do my acrylic manicure with such precision and care. She even got checkered nail wraps to match my aesthetic, and she also does a great job hand painting my signature checkerboard style. I do recommend coming in the morning, if you can!',
    avatar: 'https://images.unsplash.com/photo-1543932169-4a26c43dfaa4?w=100&h=100&fit=crop',
    verified: true,
    price: '$40–60',
    services: 'Acrylic nails, Nail designs, Pedicure',
    helpful: 18,
  },
  {
    author: 'Liz Quin',
    rating: 5,
    date: '4 years ago',
    text: 'I\'ve been back several times to get the SNS/dip powder manicure! Helen does an amazing job and is super detail oriented and sweet. My nails always last for at least a month and they look great every time. I usually call ahead to make sure Helen is in before heading over since she\'s the best with the dip powder. Also they have a huge selection of colors both dip and gel.',
    avatar: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?w=100&h=100&fit=crop',
    verified: true,
    highlights: 'Cleanliness, Quality, Professionalism, Value',
    helpful: 25,
  },
  {
    author: 'Tara Murphy',
    rating: 5,
    date: '4 months ago',
    text: 'I love this little salon in OB :) The girls are so sweet and do a great job and the prices are so good! Very clean and bright/airy. I always love how my nails look and it\'s a great stop for the 15 min massage too!',
    avatar: 'https://images.unsplash.com/photo-1617748142090-06eeb8fd1119?w=100&h=100&fit=crop',
    verified: true,
    price: '$40–60',
    services: 'Pedicure, Manicure',
    helpful: 15,
  },
  {
    author: 'Kahley Hemmer',
    rating: 5,
    date: 'a year ago',
    text: 'Affordable prices in my opinion compared to everyone else! I also just get a basic gel manicure and pedicure I\'ve been 3 times now and am always happy! My favorite is cat eye or chrome on the manicure sooo cute',
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=100&h=100&fit=crop',
    verified: true,
    price: '$80–100',
    services: 'Pedicure, Manicure',
    helpful: 10,
  },
  {
    author: 'Emmi Albert',
    rating: 5,
    date: '7 months ago',
    text: 'I had an amazing gel manicure here! They took their time to clean my cuticles, shape my nails, and make sure the polish went on perfectly. They were extremely patient and even helped me when I was being indecisive about my color choice! Great service for a great price! Will definitely return here for my next mani pedi',
    avatar: 'https://images.unsplash.com/photo-1505912755138-d45d8f4eb95e?w=100&h=100&fit=crop',
    verified: true,
    price: '$20–40',
    services: 'Gel manicures',
    helpful: 14,
  },
  {
    author: 'Sky Sannmann',
    rating: 5,
    date: '7 months ago',
    text: 'Cindy does my pedicures and she is SO good! She is strong - her leg massage and foot scrub are the best I\'ve ever had! She is really detail oriented and her polish lasts for several weeks. I\'m a fan!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    verified: true,
    price: '$40–60',
    services: 'Pedicure, Foot massages, Exfoliation, Callus removal',
    highlights: 'Very clean👍🏻',
    helpful: 20,
  },
];

const FeaturedReviewCard = memo(({ review }: { review: typeof reviews[0] }) => {
  return (
    <div className="bg-gradient-to-br from-white to-rose-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border-2 border-rose-200 dark:border-rose-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-rose-300/20 to-transparent dark:from-rose-500/20 rounded-full blur-2xl"></div>
      
      {/* Badge */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Award size={12} />
          <span>TOP REVIEW</span>
        </div>
      </div>

      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <img
          src={review.avatar}
          alt={review.author}
          loading="lazy"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-4 border-rose-300 dark:border-rose-700 shadow-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg md:text-xl text-gray-900 dark:text-white mb-2">{review.author}</h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={window.innerWidth < 768 ? 14 : 18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-lg mb-4 md:mb-6">
        "{review.text}"
      </p>

      {(review.services || review.highlights) && (
        <div className="flex flex-wrap gap-2">
          {review.services && review.services.split(', ').map((service, idx) => (
            <span
              key={idx}
              className="px-2 md:px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
          {review.highlights && (
            <span className="px-2 md:px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
              {review.highlights}
            </span>
          )}
        </div>
      )}

      {/* Helpful Count */}
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Heart size={14} />
          <span className="text-xs md:text-sm">{review.helpful} people found this helpful</span>
        </div>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
          alt="Google"
          className="h-4 md:h-5 opacity-70"
        />
      </div>
    </div>
  );
});

FeaturedReviewCard.displayName = 'FeaturedReviewCard';

const ReviewCard = memo(({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-rose-300 dark:hover:border-rose-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 30}px)`,
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
        <img
          src={review.avatar}
          alt={review.author}
          loading="lazy"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-rose-200 dark:border-rose-800"
        />
        <div className="flex-1">
          <h4 className="text-sm md:text-base text-gray-900 dark:text-white mb-1">{review.author}</h4>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
        </div>
      </div>

      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 md:mb-4">
        {review.text}
      </p>

      {(review.price || review.services) && (
        <div className="pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {review.price && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Price:</span> {review.price}
            </p>
          )}
          {review.services && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Services:</span> {review.services}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

export function GoogleReviews() {
  const googleMapsUrl = 'https://www.google.com/maps/place/Queen%27s+Nails+Hair+and+Skincare/@32.7461198,-117.2508972,17z/data=!4m15!1m8!3m7!1s0x80deaa3766574c6f:0xf7a6636c79fc1c5d!2s4869+Santa+Monica+Ave,+San+Diego,+CA+92107,+USA!3b1!8m2!3d32.7461198!4d-117.2483223!16s%2Fg%2F11bw3xx9cy!3m5!1s0x80deaa3766bc71cd:0x58947b412e099a07!8m2!3d32.7462568!4d-117.2482123!16s%2Fg%2F1tjytxy4?entry=ttu';

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;
  
  // Get most helpful review (top review)
  const topReview = reviews.reduce((prev, current) => 
    (prev.helpful > current.helpful) ? prev : current
  );

  // Rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
  }));

  return (
    <section id="google-reviews" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-yellow-300/10 dark:bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-rose-300/10 dark:bg-rose-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Stats */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="h-8 md:h-12"
            />
            <span className="text-2xl md:text-4xl text-gray-900 dark:text-white">Reviews</span>
          </div>
          
          {/* Rating Display */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl md:text-7xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {averageRating}
              </div>
              <div className="flex gap-1 mb-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={window.innerWidth < 768 ? 20 : 28}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Based on <span className="font-bold text-gray-900 dark:text-white">{totalReviews}</span> reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="w-full max-w-xs space-y-2">
              {ratingBreakdown.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2 md:gap-3">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 w-6 md:w-8">{rating} ★</span>
                  <div className="flex-1 h-2 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 w-6 md:w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                <span className="text-sm text-gray-900 dark:text-white">Verified Business</span>
              </div>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-full text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 shadow-lg group"
          >
            <span>View all reviews on Google</span>
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Featured Top Review */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
            <Award className="text-yellow-500" size={window.innerWidth < 768 ? 24 : 28} />
            Most Helpful Review
          </h3>
          <FeaturedReviewCard review={topReview} />
        </div>

        {/* Other Reviews Grid */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl text-gray-900 dark:text-white mb-4 md:mb-6">What Our Clients Say</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.filter(r => r !== topReview).map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-lg">
              <Star className="text-white" size={window.innerWidth < 768 ? 24 : 32} />
            </div>
            <h3 className="text-2xl md:text-3xl mb-3 md:mb-4 text-gray-900 dark:text-white">Share Your Experience</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-lg">
              Your feedback helps us serve you better and helps others discover our services
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-lg font-semibold"
            >
              <Star size={18} className="fill-white" />
              <span>Write a Google Review</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}