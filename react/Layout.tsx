import React, { Suspense } from 'react';
import { Config } from './Layout/Settings';

export enum SlotNames {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type LayoutSlotProps = {
  'data-slot': SlotNames;
  children?: any;
};

interface CompProps {
  children: React.ReactElement;
  className?: string;
  style?: { [key: string]: string | number };
  dataSlot?: string;
}

function Top(props: CompProps) {
  return <div className={props.className}>{props.children}</div>;
}
function Bottom(props: CompProps) {
  return <div className={props.className}>{props.children}</div>;
}
function Left(props: CompProps) {
  return <div className={props.className}>{props.children}</div>;
}
function Right(props: CompProps) {
  return <div className={props.className}>{props.children}</div>;
}

function Center(props: CompProps) {
  return <div className={props.className}>{props.children}</div>;
}

const Layout: React.FC<{ children: any } | any> = ({ children, ...props }) => {
  let top = Config.getDefaultTopComp<React.ReactElement>();
  let bottom = Config.getDefaultBottomComp<React.ReactElement>();
  let left = Config.getDefaultLeftComp<React.ReactElement>();
  let center = Config.getDefaultCenterComp<React.ReactElement>();
  let right = Config.getDefaultRightComp<React.ReactElement>();
  let rest: React.ReactElement[] = [];

  React.Children.forEach<React.ReactElement<LayoutSlotProps>>(
    children,
    (child) => {
      if (!React.isValidElement(child)) return;

      if (child.props?.['data-slot'] === SlotNames.Top) {
        top = child;
      } else if (child.props?.['data-slot'] === SlotNames.Bottom) {
        bottom = child;
      } else if (child.props?.['data-slot'] === SlotNames.Left) {
        left = child;
      } else if (child.props?.['data-slot'] === SlotNames.Center) {
        center = child;
      } else if (child.props?.['data-slot'] === SlotNames.Right) {
        right = child;
      } else {
        rest.push(child);
      }
    }
  );

  return (
    <div {...props} className="d-flex flex-column position-relative">
      <Top className="top-bar" style={{ zIndex: 10 }}>
        {top}
      </Top>
      <div className="d-flex flex-fill center-bar" style={{ zIndex: 1 }}>
        <Left className="left-side shadow flex-shrink-1 bg-dark-subtle">
          {left}
        </Left>
        <Center className="center-side flex-fill flex-grow-1 overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>{center}</Suspense>
        </Center>
        <Right className="right-side flex-shrink-1">{right}</Right>
      </div>
      <Bottom className="bottom-bar" style={{ zIndex: 10 }}>
        {bottom}
      </Bottom>
      {rest}
    </div>
  );
};

export default Layout;
