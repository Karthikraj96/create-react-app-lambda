import React, { useEffect } from 'react';
import { Button, Row, Col, Drawer } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/pro-duotone-svg-icons';
function RPPSettingsProfile({ isVisible, record, handleCancel, org }) {
  useEffect(() => {}, [record]);

  return (
    <Drawer
      title="View RPP Settings"
      width={400}
      onClose={handleCancel}
      visible={isVisible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} type="warning">
            Cancel
          </Button>
          <Button type="primary">Create</Button>
        </div>
      }
    >
      <Row>
        <Col span={24}>
          <div>
            {' '}
            {record.organization_id
              ? record.organization_id.map((e, key) => {
                  return (
                    <>
                      <div>
                        <label style={{ margin: 1 }}>Institute {' ' + (key + 1)}:</label> &nbsp; &nbsp; &nbsp;
                        <span>{org[e - 1].instituteName}</span>
                      </div>
                      <br />
                    </>
                  );
                })
              : ''}
          </div>
          <div>
            <label style={{ margin: 1 }}>Academic Year:</label> &nbsp; &nbsp; &nbsp;
            <span>{record.year}</span>
          </div>{' '}
          <br />
          <div>
            <label style={{ margin: 1 }}>Validity End Date:</label>&nbsp; &nbsp; &nbsp;
            <span>{record.validity_end ? moment(record.validity_end).format('DD/MM/YYYY') : ''}</span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>RPP Fee:</label> &nbsp; &nbsp; &nbsp;
            <span>
              <FontAwesomeIcon icon={faRupeeSign} /> {' ' + (record.fees ? record.fees.toLocaleString('en-IN') : '')}/-
            </span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>RPP Renewal Fee:</label> &nbsp; &nbsp; &nbsp;
            <span>
              {' '}
              <FontAwesomeIcon icon={faRupeeSign} />{' '}
              {' ' + (record.feesRenewal ? record.feesRenewal.toLocaleString('en-IN') : '')}/-
            </span>
          </div>
          <br />
        </Col>
      </Row>
    </Drawer>
  );
}

export default RPPSettingsProfile;
