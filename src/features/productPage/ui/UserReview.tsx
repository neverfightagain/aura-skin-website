import type {ProductReview} from "../types";

type Props = {
    review: ProductReview;
}

const UserReview = ({review}: Props) => {
    return  (
        <div
            className='border-t border-[#e5dfd5] pt-3 space-y-1.5'
        >
            <div className='flex items-center justify-between text-xs'>
                                                    <span className='text-[#1a1816] font-medium'>
                                                        {review.reviewerName}
                                                    </span>
                <span className='text-stone-500'>
                                                        {review.rating} / 5
                                                    </span>
            </div>
            <p className='text-sm text-stone-600 leading-relaxed'>
                {review.comment}
            </p>
            <p className='text-[11px] text-stone-400'>
                {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })}
            </p>
        </div>
    )
}

export default UserReview