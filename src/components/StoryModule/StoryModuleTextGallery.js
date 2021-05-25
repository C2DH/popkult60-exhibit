import React from 'react'
import Slider from 'react-slick'
import { get } from 'lodash'
import TextContent from '../TextContent'
import { Container, Row, Col} from 'react-bootstrap'
import { getModuleLayout } from '../../logic/layout'
import { useBoundingClientRect } from '../../hooks'
import StoryModuleTextGalleryItem from './StoryModuleTextGalleryItem'


const StoryModuleTextGallery = ({ mod, documents, backgroundStyles, settings, withMap=false, num=0 }) => {
  const layout = getModuleLayout(mod, withMap)

  const SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // focusOnSelect: true,
    // initialSlide: documents.length - 1,
    variableWidth: true,
    // ...settings,
  };
  const maxAvailableSlideHeight =  window.innerHeight / 2
  const [{ left }, ref] = useBoundingClientRect({ accurate: true})

  return (
    <div className={`StoryModuleTextGallery ${withMap ? 'w-50' : 'w-100'}`}>
      <Container>
        <Row>
          <Col {...layout.cols[0]}>
            <div className="StoryModule_num">{num}</div>
            <TextContent textConfig={mod.text} />
          </Col>
        </Row>
      </Container>
      <div ref={ref} className="Deck position-relative w-100" style={{
        height: maxAvailableSlideHeight  + 100
      }}>
        <div className="StoryModuleTextGallery_sliderWrapper" style={{
          width: window.innerWidth,
          height: maxAvailableSlideHeight + 100,
          left: -left,
          paddingLeft: left,
          paddingTop: 50,
          paddingBottom: 50,
        }}>
        <Slider {...SliderSettings}>
          {documents.map((d,i) => {
            // calculate width to have fair height
            const slideContentWidth = get(d, 'data.resolutions.medium.width', window.innerHeight / 2)
            const slideContentHeight = get(d, 'data.resolutions.medium.height', window.innerHeight / 2)
            let slideWidth = maxAvailableSlideHeight*slideContentWidth/slideContentHeight;

            return (
              <StoryModuleTextGalleryItem index={i} key={d.id} doc={d} data={d.data} type={d.type} style={{
                width: slideWidth,
                height: maxAvailableSlideHeight,
              }}/>
            )
          })}
        </Slider>
        </div>
      </div>
    </div>
  )
}

export default StoryModuleTextGallery
