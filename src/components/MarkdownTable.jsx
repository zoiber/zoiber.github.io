import React from 'react';

const MarkdownTable = (props) => {
  const tableProps = { ...props };
  delete tableProps.node;

  return (
    <div className="markdown-table-wrapper">
      <table {...tableProps} />
    </div>
  );
};

export default MarkdownTable;
