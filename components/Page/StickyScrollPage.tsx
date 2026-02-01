/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useTheme } from '../../Theme.tsx';
import Panel from '../Section/Panel.tsx';
import ThemeToggleButton from '../Core/ThemeToggleButton.tsx';

const panelData = [
  {
    title: 'Genesis',
    texts: ['A new idea takes form.', 'Simple, yet profound.', 'The journey begins.'],
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop',
  },
  {
    title: 'Evolution',
    texts: ['Complexity emerges from simple rules.', 'Systems grow and adapt.', 'New possibilities unfold.'],
    imageUrl: 'https://images.unsplash.com/photo-1550684376-ef16af215983?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Pinnacle',
    texts: ['Reaching the peak of potential.', 'A symphony of interconnected parts.', 'The future, realized.'],
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
  },
];

const StickyScrollPage = () => {
  const { theme } = useTheme();
  
  const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
      background: theme.Color.Base.Surface[1],
    },
    header: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: theme.spacing['Space.XL'],
      color: theme.Color.Base.Content[1],
      position: 'relative',
    },
    headerTitle: {
        ...theme.Type.Expressive.Display.L,
    },
    headerSubtitle: {
        ...theme.Type.Readable.Body.PageSubheading,
        color: theme.Color.Base.Content[2],
        marginTop: theme.spacing['Space.M'],
        maxWidth: '600px',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: theme.spacing['Space.XXL'],
        ...theme.Type.Readable.Label.S,
        color: theme.Color.Base.Content[3],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing['Space.S'],
    },
    scrollIndicatorIcon: {
        fontSize: '16px'
    }
  };

  return (
    <main style={styles.pageContainer}>
      <ThemeToggleButton />
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Vertical Sticky Scroll</h1>
        <p style={styles.headerSubtitle}>
          An implementation of a sequential reveal effect where content panels stick and animate as the user scrolls.
        </p>
        <div style={styles.scrollIndicator}>
            <span>Scroll Down</span>
            <i className="ph ph-arrow-down" style={styles.scrollIndicatorIcon}></i>
        </div>
      </header>
      {panelData.map((data, index) => <Panel key={index} {...data} />)}
    </main>
  );
};

export default StickyScrollPage;
