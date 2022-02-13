import { UploadModel } from '../UploadModel/UploadModel';
import { Divider, List } from 'antd';
import React, { useState } from 'react';
import { MapModel } from '../../../../../store/map/models/map-model';
import { useSelector } from 'react-redux';
import * as mapSelectors from '../../../../../store/map/selectors';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

interface ModelsProps {
  onDelete: (model: MapModel) => void;
}

export function Models(props: ModelsProps) {
  const models = useSelector(mapSelectors.selectModels);
  const [selectedModel, setSelectedModel] = useState<MapModel | null>(null);

  return (
    <>
      <Divider orientation="left">Models</Divider>
      <List
        header={<UploadModel />}
        bordered
        dataSource={models}
        renderItem={model => (
          <ModelItem
            key={model.id}
            $isSelected={model.id === selectedModel?.id}
            onClick={() => setSelectedModel(model)}
          >
            {model.name}
            {model.id === selectedModel?.id && (
              <DeleteButton onClick={() => props.onDelete(model)} />
            )}
          </ModelItem>
        )}
      />
    </>
  );
}

const ModelItem = styled(List.Item)<{
  $isSelected: boolean;
}>`
  position: relative;
  cursor: pointer;
  ${p =>
    p.$isSelected &&
    `
      font-weight: 500;
      background: #eee;
  `}
`;

const DeleteButton = styled(DeleteOutlined)`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
