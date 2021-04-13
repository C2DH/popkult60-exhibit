import React, { useEffect, useRef, useMemo, useState } from 'react'
import { animated, useSpring } from 'react-spring';
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useStory } from '@c2dh/react-miller'
import { useTranslation } from 'react-i18next'
import { useCurrentWindowDimensions } from '../hooks'
import { useStore } from '../store'
import StoryModules from '../components/StoryModule/StoryModules'
import MapboxWrapper from '../components/MapboxWrapper'

const calc = (ratio=1.5) => o => `translateY(${-o * ratio}px)`;

const BBoxes = [
  // "Indoxhine"
  [[97.030692,7.998675],[111.861420,24.773545]],
  // France
  [[-5.182521,41.305177],[9.752727,51.500078]],
  // Seine
  [[1.280143,47.877459],[4.001319,49.597010]],
  // kenya
  [
    [32.958984, -5.353521], [43.50585, 5.615985]
  ],
  // France
  [
    [-54.5247541978, 2.05338918702], [9.56001631027, 51.1485061713]
  ],
  // Italy
  [
    [6.7499552751, 36.619987291], [18.4802470232, 47.1153931748]
  ]
]

const Story = () => {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const { height, width } = useCurrentWindowDimensions()
  const [{ offset }, setOffset] = useSpring(() => ({ offset: 0 }));
  const [bbox, setBbox] = useState([])
  const ref = useRef()

  const [story, { pending }] = useStory(id, {
    parser: 'yaml',
  }, {
    language: i18n.language.replace('-','_'),
    cached: true,
  })
  // as soon as story is loaded, load documents
  const storyModules = useMemo(() => story?.contents?.modules || [], [
    story?.contents?.modules
  ])

  const handleScroll = () => {
    const posY = ref.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    setOffset({ offset })
  };

  const handleStoryModuleChange = ({ idx }) => {
    console.info('@handleStoryModuleChange idx:', idx);
    if(BBoxes[idx]) {
      setBbox(BBoxes[idx])
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    useStore.setState({
      backgroundColor: 'var(--white)',
      logoReduced: true,
      logoActiveColor: '#f95421',
      color: '#121821',
    });
  }, [])
  return (
    <div className="Story position-relative" ref={ref} style={{minHeight: height, width}}>
      <animated.div className="Story_cover position-absolute w-100 bg-accent" style={{
        top: 0,
        height,
        zIndex:1,
        transform: offset.interpolate(calc())
      }}>
        <Container className="d-flex h-100 w-100 align-items-center" >
          <div className="w-100">
            <div className="Story_tags text-center capitalize mb-5 text-white">{(story?.tags || []).filter(d=> d.category==='keyword').map(tag => (<p key={tag.slug}>{tag.name}</p>))}</div>
            <div className="Story_authors text-center mb-5 text-white font-weight-bold">
              Maude Williams
            </div>
            <h1 className="display-2 text-center">{story?.data?.title || '...'}</h1>
          </div>
        </Container>
      </animated.div>
      <div style={{paddingTop: height*.5}}>
      <Container >
        <Row>
        <Col {...{md: {span: 8, offset:2}}}>
        <animated.div style={{transform: offset.interpolate(calc(0.15))}}>
        <h2 style={{

        }} className="text-dark">{story?.data?.abstract || '■ ■ ■'}</h2>
        { pending ? 'loading' : ''}
        </animated.div>
        </Col>
        </Row>
      </Container>
      </div>
      {story
        ? <MapboxWrapper fixed height={height} width={width/2} left={width/2} initialLng={BBoxes[0][0][0]} initialLat={BBoxes[0][0][1]} bbox={bbox}/>
        : null
      }
      <StoryModules onChange={handleStoryModuleChange} height={height} width={width} storyModules={storyModules}/>
    </div>
  )
}

export default Story
