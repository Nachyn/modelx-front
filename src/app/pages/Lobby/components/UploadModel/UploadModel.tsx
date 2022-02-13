import styled from 'styled-components';
import { ChangeEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as mapActions from '../../../../../store/map/actions';

export function UploadModel() {
  const dispatch = useDispatch();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement)!.files![0];
    if (file) {
      dispatch(mapActions.uploadModel(file));
    }
  };

  return (
    <>
      <Hidden>
        <input
          ref={inputFileRef}
          type="file"
          hidden
          onChange={handleFileSelect}
          accept=".glb"
        />
      </Hidden>
      <UploadModelComponent onClick={() => inputFileRef.current?.click()}>
        Add model to selected Lng / Lat
      </UploadModelComponent>
    </>
  );
}

const UploadModelComponent = styled.div`
  cursor: pointer;
  font-weight: 500;
`;

const Hidden = styled.div`
  display: none;
`;
