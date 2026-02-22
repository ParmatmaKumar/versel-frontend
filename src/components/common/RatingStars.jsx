import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size, interactive = false, onChange, value }) {
  const [hoveredStar, setHoveredStar] = useState(0)
  const [selectedRating, setSelectedRating] = useState(value || 0)
  
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    if (interactive && value !== undefined) {
      setSelectedRating(value)
    }
  }, [value, interactive])

  useEffect(() => {
    if (!interactive) {
      // Display mode - use Review_Count
      const wholeStars = Math.floor(Review_Count) || 0
      SetStarCount({
        full: wholeStars,
        half: Number.isInteger(Review_Count) ? 0 : 1,
        empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
      })
    } else {
      // Interactive mode - use selectedRating or hoveredStar
      const ratingToShow = hoveredStar || selectedRating
      const wholeStars = Math.floor(ratingToShow) || 0
      SetStarCount({
        full: wholeStars,
        half: 0, // No half stars in interactive mode
        empty: 5 - wholeStars,
      })
    }
  }, [Review_Count, interactive, selectedRating, hoveredStar])

  const handleStarClick = (starIndex) => {
    if (!interactive) return
    const newRating = starIndex + 1
    setSelectedRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }

  const handleStarHover = (starIndex) => {
    if (!interactive) return
    setHoveredStar(starIndex + 1)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setHoveredStar(0)
  }

  return (
    <div 
      className={`flex gap-1 text-yellow-100 ${interactive ? 'cursor-pointer' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {[...new Array(5)].map((_, i) => {
        const starValue = i + 1
        const isFull = starValue <= starCount.full
        const isHalf = starCount.half > 0 && starValue === starCount.full + 1 && !interactive
        
        if (interactive) {
          return (
            <span
              key={i}
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => handleStarHover(i)}
              className="transition-transform hover:scale-110"
            >
              {isFull ? (
                <TiStarFullOutline size={Star_Size || 20} />
              ) : (
                <TiStarOutline size={Star_Size || 20} />
              )}
            </span>
          )
        } else {
          // Display mode
          if (isFull) {
            return <TiStarFullOutline key={i} size={Star_Size || 20} />
          } else if (isHalf) {
            return <TiStarHalfOutline key={i} size={Star_Size || 20} />
          } else {
            return <TiStarOutline key={i} size={Star_Size || 20} />
          }
        }
      })}
    </div>
  )
}

export default RatingStars