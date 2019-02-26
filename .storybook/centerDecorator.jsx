import React from 'react';

function CenterDecorator(storyFn) {
  const container = {
    padding: '2% 5% 2% 5%',
  };

  const contentContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  };
  const leftSide = { flexGrow: 0 };
  const centerContent = { flexGrow: 2 };
  const rightSide = { flexGrow: 0 };
  const guideBox = {
    width: '20px',
    height: '20px',
  };
  const guide = Object.assign(
    {
      borderStyle: 'solid',
      borderColor: '#EBEBEB',
    },
    guideBox
  );
  const guideTopLeft = Object.assign(
    {
      borderWidth: '0px 1px 1px 0px',
    },
    guide
  );
  const guideTopRight = Object.assign(
    {
      borderWidth: '0px 0px 1px 1px',
    },
    guide
  );
  const guideCenterLeft = Object.assign(guideBox);
  const guideCenterRight = Object.assign(guideBox);
  const guideBottomLeft = Object.assign(
    {
      borderWidth: '1px 1px 0px 0px',
    },
    guide
  );
  const guideBottomRight = Object.assign(
    {
      borderWidth: '1px 0px 0px 1px',
    },
    guide
  );

  return (
    <div style={container}>
      <div style={contentContainer}>
        <div style={leftSide}>
          <div style={guideTopLeft} />
        </div>
        <div style={centerContent} />
        <div style={rightSide}>
          <div style={guideTopRight} />
        </div>
      </div>
      <div style={contentContainer}>
        <div style={leftSide}>
          <div style={guideCenterLeft} />
        </div>
        <div style={centerContent}>{storyFn()}</div>
        <div style={rightSide}>
          <div style={guideCenterRight} />
        </div>
      </div>
      <div style={contentContainer}>
        <div style={leftSide}>
          <div style={guideBottomLeft} />
        </div>
        <div style={centerContent} />
        <div style={rightSide}>
          <div style={guideBottomRight} />
        </div>
      </div>
    </div>
  );
}

module.exports = {
  CenterDecorator: CenterDecorator
};
