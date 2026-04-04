import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/claude-code/getting-started/what-is-claude-code">
            开始学习
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="首页"
      description="Claude Code 知识库 - 深度整合的 AI 编程最佳实践">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem 0'}}>
          <div className="row">
            <div className="col col--4">
              <div className="text--center">
                <h3>🎯 入门系列</h3>
                <p>从零开始掌握 Claude Code 基础概念</p>
                <Link to="/docs/claude-code/getting-started/what-is-claude-code">开始 →</Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center">
                <h3>🛠️ 技能体系</h3>
                <p>深入理解 Skills、Agent、MCP 等核心系统</p>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center">
                <h3>🚀 实战技巧</h3>
                <p>将 AI 编程应用到真实项目</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}