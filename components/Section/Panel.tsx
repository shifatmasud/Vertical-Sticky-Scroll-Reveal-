/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../Theme.tsx';

interface PanelProps {
  title: string;
  texts: string[];
  imageUrl: string;
}

const Panel: React.FC<PanelProps> = ({ title, texts, imageUrl }) => {
  const { theme } = useTheme();
  const parentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ['start start', 'end start'],
  });

  const styles: { [key: string]: React.CSSProperties } = {
    parent: {
      height: '100vh',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'clip',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    child: {
      height: '300%',
      width: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
    },
    grandchild: {
      height: '100vh',
      width: '100%',
      position: 'sticky',
      top: '0',
      overflow: 'clip',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: theme.Color.Base.Content['1'],
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.Color.Base.Surface[1],
      opacity: theme.themeName === 'dark' ? 0.8 : 0.6,
      zIndex: 1,
    },
    contentContainer: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: theme.spacing['Space.XXL'],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing['Space.L'],
      width: '80%',
      maxWidth: '800px',
    },
    title: {
      ...theme.Type.Expressive.Display.M,
      color: theme.Color.Base.Content['1'],
      marginBottom: theme.spacing['Space.XL'],
    },
    textContainer: {
        height: '6em', // Reserve space for 3 lines of text to prevent layout shifts
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      ...theme.Type.Readable.Body.L,
      color: theme.Color.Base.Content['1'],
      position: 'absolute', // Stack texts on top of each other
    },
  };

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={parentRef} style={styles.parent}>
      <div style={styles.child}>
        <div style={styles.grandchild}>
          <motion.div style={{ ...styles.background, scale: backgroundScale }} />
          <div style={styles.overlay} />
          <div style={styles.contentContainer}>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.textContainer}>
              {texts.map((text, i) => {
                const totalTexts = texts.length;
                const segment = 1 / totalTexts;
                const start = i * segment;
                const end = start + segment;
                
                const opacity = useTransform(scrollYProgress, 
                    [start, start + segment * 0.25, end - segment * 0.25, end], 
                    [0, 1, 1, 0]
                );
                const y = useTransform(scrollYProgress, [start, start + segment * 0.25], [30, 0]);

                return (
                  <motion.p key={i} style={{ ...styles.text, opacity, y }}>
                    {text}
                  </motion.p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panel;
