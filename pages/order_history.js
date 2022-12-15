import React, { useEffect, useReducer, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Link from 'next/link'
import {IoAddOutline} from "react-icons/io"
import {RiDeleteBin5Line} from "react-icons/ri"
import {FaRegEye} from "react-icons/fa"
import { getError } from '../lib/error';
import axios from 'axios';
import { FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS } from '../constants/constants';
import moment from "moment"
import MotionWrap from '../components/MotionWrap'



function reducer(state, action) {
        switch (action.type) {
          case FETCH_REQUEST:
            return { ...state, loading: true, error: '' };
          case FETCH_SUCCESS:
                return { ...state, loading: false, orders: action.payload, error: '' };
          case FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
          default:
            return state;
        }
}

export default function OrderList() {
        const [pageSize, setPageSize] = useState(10);

        const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
                loading: true,
                orders: [],
                error: '',
        });


        useEffect(() => {
                const fetchOrders = async () => {
                        try {
                                dispatch({ type: FETCH_REQUEST });
                                const { data } = await axios.get(`/api/orders/history`);
                                dispatch({ type: FETCH_SUCCESS, payload: data });
                        } 
                        catch (err) {
                                dispatch({ type: FETCH_FAIL, payload: getError(err) });
                        }
                };
                fetchOrders();
                console.log("orders",orders)
        }, [dispatch]);



    // const [data, setData]= useState(productRows)

    // const handleDelete=(id)=>{
    //     setData(data.filter(item=>item.id !== id))
    // };


     
   

    const columns = [
        { 
                field: '_id', 
                headerName: 'ID', 
                width: 150 ,
                renderCell:(param)=>{
                        return (
                                <Link href={"/order/"+param.row._id} style={{marginLeft:".8rem"}}>
                                        {param.row._id.substring(16,24)}
                                </Link>
                        )
                }
        },
        {
            field: 'orderItems',
            headerName: 'ITEMS',
            width: 200,
            renderCell:(param)=>{
                return(
                        <div className='order-history-images'>
                                {
                                        param.row.orderItems.map(item=>(
                                                <Link href={"/product/"+item.slug}>
                                                        <img src={item.image} alt={`product ${item.name}`}  width="40px" height="40px"/>     
                                                </Link>
                                        ))
                                }
                        </div>
                )
            }
        },
        {
          field: 'createdAt',
          headerName: 'DATE',
          width: 180,
          renderCell:(param)=>{
                return (
                        moment(param.row.createdAt).fromNow()
                )
          }
        },
        
        {
          field: 'totalPrice',
          headerName: 'TOTAL',
          width: 150,
          renderCell:(param)=>{
                return (
                        <span>₦{param.row.totalPrice.toLocaleString()}</span>
                        
                )
          }
        },
        {
                field: 'isPaid',
                headerName: 'PAID',
                width: 180,
                renderCell:(param)=>{
                        return (
                                param.row.isPaid?
                                (
                                        <div className='order-history-redcross'>{moment(param.row.paidAt).format('D[/]MM[/]YYYY [at] h:mma')}</div>
                                )
                                :
                                (
                                        <div className='order-history-redcross'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> 
                                )
                        )
                }
        
                
        },
        {
                field: 'isDelivered',
                headerName: 'DELIVERED',
                width: 180,
                renderCell:(param)=>{
                        return (
                                param.row.isDelivered?
                                (
                                        <div className='order-history-redcross'>{moment(param.row.paidAt).format('D[/]MM[/]YYYY [at] h:mma')}</div>
                                )
                                :
                                (
                                        <div className='order-history-redcross'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> 
                                )
                        )
                }
        },
       
       
  
        {
                field: 'actions',
                headerName: 'ACTIONS',
                width: 140,
                align:"center",
                renderCell:(param)=>{
                return(
                        <div className='order-history-actions'>
                                <Link href={"/order/"+param.row._id}>
                                        <FaRegEye  size={24} className="productListViewIcon"/>
                                </Link>

                                <RiDeleteBin5Line   size={24} className="productListDeleteIcon" onClick={()=>handleDelete(param.row._id)}/>
                        </div>
                );
                }
        },
      ];


    return (
        <div  className='place-order-screen'>
                <h1>Order History</h1>
                {
                        loading? <div className="customerPage">
                        <div className='LoadingBoxcustomerPage'>
                                <div>Loading...</div>
                        </div>
                        </div>
                

                :
                error?  <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <div className="alert-error">{error}</div>
                            </div>
                        </div>
                :
                    
                <MotionWrap>
                
                    <div className="productList" style={{ height : "600px", width: '100%' }}>
                        
                        <DataGrid
                            rows={orders}
                            columns={columns}
                            getRowId={(row) => row._id} 

                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination

                            rowHeight={70}

                            initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}

                        />
                    </div>
                </MotionWrap>
                
            }
        </div>
    )
}


OrderList.auth=true